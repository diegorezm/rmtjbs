# REMOTE JOBS

## SCHEMA
1. user: 
    - name
    - email
    - password
    - created_at
    - updated_at

2. company extends user: 
    - location
    - banner_key? (key for s3 image)

3. candidate extends user:
    - profile_picture_key? (key for s3 image)
    - resume_key (key for file in s3)
    - contact? (phone number)
    - job_preferences[] (array)

4. job_postings:
    - title
    - description
    - salary?
    - company_id
    - expires_at
    - created_at
    - updated_at

4. job_applicants:
    - user_id
    - job_posting_id
    - applied_at

## TODOS
- [] auth
- [] services
- [] pages
- [] integrate frontend with backend
- [] upload to s3
