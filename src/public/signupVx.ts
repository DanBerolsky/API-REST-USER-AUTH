export default function html(action: string) {
  if (action === "/v4/signup") {
    return `<form action="/v4/signup" method="post">
    <h1>Sign Up</h1>
  
      <button type="submit">google</button>
    </div>
  </form>`;
  }
  return `<form action="${action}" method="post">
  <h1>Sign Up</h1>
  <div>
    <label for="email">email</label>
    <input name="email" id="email" placeholder="email" />
  </div>
  <div>
    <label for="password">password</label>
    <input name="password" id="password" placeholder="password" />
  </div>
  <div>
    <button type="submit">create</button>
  </div>
</form>`;
}
