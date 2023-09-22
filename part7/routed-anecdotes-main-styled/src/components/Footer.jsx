import styled from "styled-components";

const FooterStyle = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;
const Footer = () => (
  <FooterStyle>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{" "}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </FooterStyle>
);

export default Footer;
