type AboutProps = {
  params: { id: string }
}

const About = ({ params }: AboutProps) => {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page : {params.id}</p>
    </div>
  )
}

export default About
