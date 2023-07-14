import { useState } from 'react'

const ChoiceButtons = ({ goodClick, neutralClick, badClick }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Button name='good' handleClick={goodClick}></Button>
      <Button name='neutral' handleClick={neutralClick}></Button>
      <Button name='bad' handleClick={badClick}></Button>
    </div>
  )
}

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Feedback = ({ goodNum, neutralNum, badNum }) => {
  const all = goodNum + neutralNum + badNum
  const average = (goodNum - badNum) / all
  const positive = goodNum / all
  if (goodNum > 0 || neutralNum > 0 || badNum > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticsLine text='good' value={goodNum}></StatisticsLine>
          </tr>
          <tr>
            <StatisticsLine text='neutral' value={neutralNum}></StatisticsLine>
          </tr>
          <tr>
            <StatisticsLine text='bad' value={badNum}></StatisticsLine>
          </tr>
          <tr>
            <StatisticsLine text='all' value={all}></StatisticsLine>
          </tr>
          <tr>
            <StatisticsLine text='average' value={average}></StatisticsLine>
          </tr>
          <tr>
            <StatisticsLine text='positive' value={positive + '%'}></StatisticsLine>
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <p>No Feedback Given</p>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodVote = () => {
    setGood(good + 1)
    console.log(good)
  }

  const neutralVote = () => {
    setNeutral(neutral + 1)
    console.log(neutral)
  }

  const badVote = () => {
    setBad(bad + 1)
    console.log(bad)
  }

  return (
    <>
      <h1>give feedback</h1>
      <ChoiceButtons goodClick={goodVote} neutralClick={neutralVote} badClick={badVote}></ChoiceButtons>
      <h1>statistics</h1>
      <Feedback goodNum={good} neutralNum={neutral} badNum={bad}></Feedback>
    </>
  )
}

export default App