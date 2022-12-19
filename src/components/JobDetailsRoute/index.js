import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

import {BsBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {MdLocationOn} from 'react-icons/md'

import Loader from 'react-loader-spinner'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class jobDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        similarJobs: fetchedData.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
        title: fetchedData.job_details.title,
      }

      this.setState({
        jobDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    // below comment used to disable eslint for testId line
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails} = this.state

    return (
      <>
        <div className="job-details-item">
          <div className="company-logo-and-heading-container">
            <img
              src={jobDetails.companyLogoUrl}
              className="job-company-logo"
              alt="job details company logo"
            />
            <div className="company-heading-and-rating-container">
              <h1 className="company-heading">{jobDetails.title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-icon" />
                <p className="rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-package-container">
            <div className="location-and-employment-type-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-text">{jobDetails.location}</p>
              </div>
              <div className="employment-type-container">
                <BsBriefcaseFill className="briefcase-icon" />
                <p className="employment-text">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="package-text">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="job-horizontal-line" />
          <>
            <div className="job-description-and-website-container">
              <h1 className="description-heading">Description</h1>
              <a
                href={jobDetails.companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="website-link"
              >
                <p className="link-text">Visit</p>
                <FiExternalLink className="link-icon" />
              </a>
            </div>
            <p className="description-info">{jobDetails.jobDescription}</p>
          </>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {jobDetails.skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill-item">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-and-image-container">
            <p className="life-at-company-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar jobs</h1>
        <ul className="similar-jobs-list-container">
          {jobDetails.similarJobs.map(eachJob => (
            <SimilarJobItem key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        <div className="job-details-responsive-container">
          <div className="job-details-and-similar-jobs-container">
            {this.renderApiStatusView()}
          </div>
        </div>
      </div>
    )
  }
}

export default jobDetailsRoute
