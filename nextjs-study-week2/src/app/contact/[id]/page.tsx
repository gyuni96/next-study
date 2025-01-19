type ContactProps = {
  params: { id: string }
}

const Contact = ({ params }: ContactProps) => {
  return (
    <div>
      <h1>Contact</h1>
      <p>This is the contact page : {params.id}</p>
    </div>
  )
}

export default Contact
