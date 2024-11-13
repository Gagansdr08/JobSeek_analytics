from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import DictCursor
from contextlib import closing
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
bcrypt = Bcrypt(app)  # Initialize Bcrypt for hashing passwords

# Database connection details
db_config = {
    "dbname": "sql_course",
    "user": "postgres",
    "password": "GaganPOSTGRE8+",
    "host": "localhost",
    "port": "5432"
}

def is_admin(user_id):
    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT is_admin FROM public.users WHERE user_id = %s", (user_id,))
                user = cur.fetchone()
                return user[0] if user else False
    except Exception as e:
        return False

@app.route('/top-paying-jobs', methods=['GET'])
def get_top_paying_jobs():
    job_title = request.args.get('job_title', default='Data Analyst')
    location = request.args.get('location', default='India')
    order_by = request.args.get('order_by', default='salary_year_avg')
    # order_dir = request.args.get('order_dir', default='DESC').upper()
    # limit = request.args.get('limit', default=10, type=int)

    # if order_by not in ['salary_year_avg', 'salary_hour_avg']:
    #     return jsonify({"error": "Invalid order_by parameter"}), 400
    # if order_dir not in ['ASC', 'DESC']:
    #     return jsonify({"error": "Invalid order_dir parameter"}), 400
    # if limit not in [10, 25, 100]:  # Validate the limit value
    #     return jsonify({"error": "Invalid limit parameter. Use 10, 25, or 100."}), 400

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                query = """
                    SELECT job_id, job_title, job_location, job_schedule_type, 
                           salary_year_avg, job_posted_date, company_dim.name AS company_name
                    FROM job_postings_fact
                    LEFT JOIN company_dim ON job_postings_fact.company_id = company_dim.company_id
                    WHERE job_title_short = %s AND job_location = %s AND salary_year_avg IS NOT NULL
                    ORDER BY salary_year_avg DESC
                    LIMIT 10;
                """
                cur.execute(query, (job_title, location))
                result = cur.fetchall()

                # Format the result as a list of dictionaries
                jobs = [
                    {
                        "job_id": row[0],
                        "job_title": row[1],
                        "job_location": row[2],
                        "job_schedule_type": row[3],
                        "salary_year_avg": row[4],
                        "job_posted_date": row[5],
                        "company_name": row[6],
                    }
                    for row in result
                ]

                return jsonify(jobs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Ensure is_admin is treated correctly
    is_admin = data.get('is_admin', False)
    if isinstance(is_admin, str):
        is_admin = is_admin.lower() == 'true'
    elif isinstance(is_admin, bool):
        is_admin = is_admin
    else:
        is_admin = False  # default to False if not provided

    # Hash the password for secure storage
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                # Insert the new user, ensuring unique username and email
                cur.execute("""
                    INSERT INTO public.users (username, email, hashed_password, is_admin) 
                    VALUES (%s, %s, %s, %s)  -- Ensure is_admin is included
                    RETURNING user_id;
                """, (username, email, hashed_password, is_admin))
                conn.commit()
                user_id = cur.fetchone()[0]

                return jsonify({"message": "User registered successfully", "user_id": user_id}), 201
    except psycopg2.IntegrityError:
        return jsonify({"error": "Username or email already exists"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor(cursor_factory=DictCursor) as cur:
                # Retrieve user data based on username
                cur.execute("SELECT * FROM public.users WHERE username = %s", (username,))
                user = cur.fetchone()

                # Verify password and return user information if valid
                if user and bcrypt.check_password_hash(user['hashed_password'], password):
                    return jsonify({
                        "message": "Login successful",
                        "user_id": user['user_id'],
                        "is_admin": user['is_admin']  # Include admin status in response
                    }), 200
                else:
                    return jsonify({"error": "Invalid username or password"}), 401
                
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Admin: Add Job Posting
@app.route('/add-job-posting', methods=['POST'])
def add_job_posting():
    data = request.get_json()
    user_id = data.get('user_id')  # Get user ID from the request
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized access"}), 403

    job_title_short = data.get('job_title_short')
    job_title = data.get('job_title')
    job_location = data.get('job_location')
    company_id = data.get('company_id')  # Assuming the company ID is passed
    job_schedule_type = data.get('job_schedule_type')
    salary_year_avg = data.get('salary_year_avg')
    job_posted_date = data.get('job_posted_date')
    job_id=data.get('job_id')

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO public.job_postings_fact (company_id, job_title_short, job_title, job_location, job_schedule_type, salary_year_avg, job_posted_date, created_by,job_id) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s);
                """, (company_id, job_title_short, job_title, job_location, job_schedule_type, salary_year_avg, job_posted_date, user_id,job_id))
                conn.commit()

                return jsonify({"message": "Job posting added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Admin: Update Job Posting
@app.route('/job-posting/<int:job_id>', methods=['PUT'])
def update_job_posting(job_id):
    data = request.get_json()
    user_id = data.get('user_id')  # Get user ID from the request
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized access"}), 403

    job_title_short = data.get('job_title_short')
    job_title = data.get('job_title')
    job_location = data.get('job_location')
    company_id = data.get('company_id')
    job_schedule_type = data.get('job_schedule_type')
    salary_year_avg = data.get('salary_year_avg')
    job_posted_date = data.get('job_posted_date')

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE public.job_postings_fact 
                    SET job_title_short = %s, job_title = %s, job_location = %s, company_id = %s, job_schedule_type = %s, salary_year_avg = %s, job_posted_date = %s 
                    WHERE job_id = %s;
                """, (job_title_short, job_title, job_location, company_id, job_schedule_type, salary_year_avg, job_posted_date, job_id))
                conn.commit()

                return jsonify({"message": "Job posting updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# Admin: Delete Job Posting
@app.route('/job-posting/<int:job_id>', methods=['DELETE'])
def delete_job_posting(job_id):
    data = request.get_json()
    user_id = data.get('user_id')  # Get user ID from the request
    if not is_admin(user_id):
        return jsonify({"error": "Unauthorized access"}), 403

    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM public.job_postings_fact WHERE job_id = %s;", (job_id,))
                conn.commit()

                return jsonify({"message": "Job posting deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)