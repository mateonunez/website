export default function Profile({ avatar, bio, company, email, username, url, location, ...rest }) {
  return (
    <>
      <div {...rest}>{/* Avatar  */}</div>
    </>
  );
}
