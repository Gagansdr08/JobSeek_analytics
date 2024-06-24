WITH skills_demand AS(
    SELECT skills_dim.skills,
        skills_dim.skill_id,
        COUNT(skills_job_dim.job_id) AS demand_count
    FROM job_postings_fact
        INNER JOIN skills_job_dim ON job_postings_fact.job_id = skills_job_dim.job_id
        INNER JOIN skills_dim ON skills_job_dim.skill_id = skills_dim.skill_id
    WHERE job_title_short = 'Data Scientist'
        AND job_location = 'India'
    GROUP BY skills_dim.skill_id
),
average_salary AS (
    SELECT skills_job_dim.skill_id,
        ROUND(AVG(salary_year_avg), 0) AS average_salary
    FROM job_postings_fact
        INNER JOIN skills_job_dim ON job_postings_fact.job_id = skills_job_dim.job_id
        INNER JOIN skills_dim ON skills_job_dim.skill_id = skills_dim.skill_id
    WHERE job_title_short = 'Data Scientist'
        AND salary_year_avg is not NULL
        AND job_work_from_home = True
    GROUP BY skills_job_dim.skill_id
)
SELECT skills_demand.skill_id,
    skills_demand.skills,
    demand_count,
    average_salary
FROM skills_demand
    INNER JOIN average_salary ON skills_demand.skill_id = average_salary.skill_id
ORDER BY demand_count DESC,
    average_salary DESC
LIMIT 10