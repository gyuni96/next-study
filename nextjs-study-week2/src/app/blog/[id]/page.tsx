type BlogProps = {
  params: { id: string }
}

const Blog = ({ params }: BlogProps) => {
  return (
    <div>
      <h1>Blog</h1>
      <p>This is the blog page : {params.id}</p>
    </div>
  )
}

export default Blog
