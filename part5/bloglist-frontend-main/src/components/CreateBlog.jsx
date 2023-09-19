function CreateBlog({ handleBlogChange, addBlog, newblog }) {
  return (
    <div>
      <form onSubmit={addBlog} data-testid="create-blog-form">
        <p></p>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          placeholder="title"
          value={newblog.title}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          placeholder="author"
          value={newblog.author}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          placeholder="url"
          value={newblog.url}
          onChange={handleBlogChange}
        />
        <br />
        <button type="submit" id="create-blog">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;
