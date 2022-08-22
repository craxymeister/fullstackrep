import React from 'react';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <>
      {name} {exercises}
      <br></br>
      <br></br>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <>
        {parts.map((part, id) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </>
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return (
    <div>
      <>total of {total} exercises</>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;