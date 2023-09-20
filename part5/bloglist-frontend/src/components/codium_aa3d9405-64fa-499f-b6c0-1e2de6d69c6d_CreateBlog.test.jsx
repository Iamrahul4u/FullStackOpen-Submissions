

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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;


// Generated by CodiumAI

describe('CreateBlog', () => {

    // User can submit the form by clicking the 'Create' button
    it('should submit the form when the "Create" button is clicked', () => {
      const addBlogMock = jest.fn();
      render(<CreateBlog addBlog={addBlogMock} />);
      const createButton = screen.getByText('Create');

      fireEvent.click(createButton);

      expect(addBlogMock).toHaveBeenCalledTimes(1);
    });
});