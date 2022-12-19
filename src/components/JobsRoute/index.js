import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import './index.css'
import Filters from '../Filters'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    selectedJobTypes: [],
    selectedSalaryRange: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, selectedJobTypes, selectedSalaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedJobTypes.join(
      ',',
    )}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsData()
  }

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  renderNoJobsView = () => (
    <div className="no-data-found-container">
      <img
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-data-found-img"
      />
      <h1 className="no-data-found-heading">No Jobs Found</h1>
      <p className="no-data-found-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    // below comment used to disable eslint for testId line
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      this.renderNoJobsView()
    ) : (
      <ul className="jobs-list-items">
        {jobsList.map(eachjob => (
          <JobItem key={eachjob.id} jobDetails={eachjob} />
        ))}
      </ul>
    )
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          placeholder="search"
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          className="search-input"
        />
        <button
          onClick={this.onClickSearch}
          className="search-btn"
          // below comment used to disable eslint for testId line
          // eslint-disable-next-line react/no-unknown-property
          testid="searchButton"
          type="button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  selectedSalaryRange = selectedSalaryId => {
    this.setState({selectedSalaryRange: selectedSalaryId}, this.getJobsData)
  }

  selectedEmploymentType = (isChecked, selectedJobType) => {
    const {selectedJobTypes} = this.state
    if (isChecked) {
      const updatedJobTyepesList = [...selectedJobTypes, selectedJobType]
      this.setState({selectedJobTypes: updatedJobTyepesList}, this.getJobsData)
    } else {
      const updatedJobTypesList = selectedJobTypes.filter(
        eachJobType => eachJobType !== selectedJobType,
      )
      this.setState({selectedJobTypes: updatedJobTypesList}, this.getJobsData)
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-responsive-container">
          <div className="mobile-search-input-container">
            {this.renderSearchInput()}
          </div>
          <div className="profile-and-filters-container">
            <Profile />

            <hr className="horizontal-line" />
            <Filters
              selectedEmploymentType={this.selectedEmploymentType}
              selectedSalaryRange={this.selectedSalaryRange}
            />
          </div>
          <div className="Jobs-list-container">
            <div className="desktop-search-input-container">
              {this.renderSearchInput()}
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
