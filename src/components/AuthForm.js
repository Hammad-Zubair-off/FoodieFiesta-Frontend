import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  children,
  submitText,
  onSubmit,
  error,
  loading,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  return (
    <div className="container" style={{ backgroundColor: "transparent" }}>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                {title}
              </h5>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit}>
                {children}

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : null}
                    {submitText}
                  </button>
                </div>

                {footerText && footerLinkText && footerLinkTo && (
                  <>
                    <hr className="my-4" />
                    <div className="d-grid text-center">
                      <span>
                        {footerText}{" "}
                        <Link
                          to={footerLinkTo}
                          className="text-primary fw-bold"
                        >
                          {footerLinkText}
                        </Link>
                      </span>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
