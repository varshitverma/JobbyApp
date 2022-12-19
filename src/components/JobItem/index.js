import {Link} from 'react-router-dom'
import {BsBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  return (
    <Link to={`/jobs/${jobDetails.id}`} className="link">
      <li className="job-item">
        <div className="company-logo-and-heading-container">
          <img
            src={jobDetails.companyLogoUrl}
            className="job-company-logo"
            alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p className="description-info">{jobDetails.jobDescription}</p>
        </>
      </li>
    </Link>
  )
}

export default JobItem
