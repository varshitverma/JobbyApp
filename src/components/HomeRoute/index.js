import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const onClickFindJobs = () => {
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="background-image-container">
        <div className="home-content-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,
            company reviews. Find the jobs that fits your ability and potential
          </p>
          <Link className="link" to="/jobs">
            <button
              type="submit"
              className="find-jobs-btn"
              onClick={onClickFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
