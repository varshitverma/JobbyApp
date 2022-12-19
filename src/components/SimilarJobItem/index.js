import {BsBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  return (
    <li className="similar-job-item">
      <div className="company-logo-and-heading-container">
        <img
          src={similarJobDetails.companyLogoUrl}
          className="job-company-logo"
          alt="similar job company logo"
        />
        <div className="company-heading-and-rating-container">
          <h1 className="company-heading">{similarJobDetails.title}</h1>
          <div className="rating-container">
            <BsFillStarFill className="star-icon" />
            <p className="rating-text">{similarJobDetails.rating}</p>
          </div>
        </div>
      </div>
      <>
        <h1 className="description-heading">Description</h1>
        <p className="description-info">{similarJobDetails.jobDescription}</p>
      </>
      <div className="location-and-package-container">
        <div className="location-and-employment-type-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-text">{similarJobDetails.location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill className="briefcase-icon" />
            <p className="employment-text">
              {similarJobDetails.employmentType}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
