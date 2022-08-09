const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

    
  }

  const [first, second, third] = course.parts
  const total = first.exercises + second.exercises + third.exercises

  return (
    <div>
    <h1>{course.name}</h1>
    <>{first.name}, {first.exercises} excercises</>
    <br></br>
    <>{second.name}, {second.exercises} excercises</>
    <br></br>
    <>{third.name}, {third.exercises} excercises</>
    <br></br>
    <>Total of {total} excercises</>
  </div>
  )
}

export default App