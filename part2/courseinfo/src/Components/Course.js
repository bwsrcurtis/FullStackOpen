import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name}></Header>
			<Content parts={course.parts}></Content>

		</>

	)
}

export default Course