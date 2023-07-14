import Parts from "./Parts"

const Content = ({ parts }) => {
	const total = parts.reduce((acc, p) => acc + p.exercises, 0)

	return (
		<>
			<Parts parts={parts}></Parts>
			<p>total of {total} exercises</p>

		</>
	)
}

export default Content