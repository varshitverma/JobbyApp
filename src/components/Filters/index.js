import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {selectedSalaryRange, selectedEmploymentType} = props
  const onSelectSalaryRange = event => {
    selectedSalaryRange(event.target.id)
  }
  const onSelectEmploymentType = event => {
    selectedEmploymentType(event.target.checked, event.target.id)
  }
  const renderTypeOfEmploymentSection = () => (
    <div className="type-of-employment-container">
      <h1 className="filter-type-heading">Type of Employment</h1>
      <ul className="list-items-container">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="list-item">
            <input
              className="checkbox-input"
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={onSelectEmploymentType}
            />
            <label className="label-text" htmlFor={eachType.employmentTypeId}>
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
  const renderSalaryRanges = () => (
    <div className="salary-ranges-container">
      <h1 className="filter-type-heading"> Salary Range</h1>
      <ul className="list-items-container">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.salaryRangeId} className="list-item">
            <input
              className="radio-input"
              type="radio"
              name="salary"
              id={eachRange.salaryRangeId}
              onChange={onSelectSalaryRange}
            />
            <label className="label-text" htmlFor={eachRange.salaryRangeId}>
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className="filter-container">
      {renderTypeOfEmploymentSection()}
      <hr className="horizontal-line" />
      {renderSalaryRanges()}
    </div>
  )
}

export default Filters
