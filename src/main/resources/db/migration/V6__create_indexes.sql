CREATE INDEX idx_rmtjbs_users_email ON rmtjbs_users(email);
CREATE INDEX idx_rmtjbs_companies_user_id ON rmtjbs_companies(user_id);
CREATE INDEX idx_rmtjbs_candidates_user_id ON rmtjbs_candidates(user_id);
CREATE INDEX idx_rmtjbs_job_postings_company_id ON rmtjbs_job_postings(company_id);
CREATE INDEX idx_rmtjbs_job_applicants_candidate_id ON rmtjbs_job_applicants(candidate_id);
CREATE INDEX idx_rmtjbs_job_applicants_job_posting_id ON rmtjbs_job_applicants(job_posting_id);
