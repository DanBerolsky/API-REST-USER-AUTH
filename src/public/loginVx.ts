export default function html(action: string, strategy?: string) {
  if (strategy) {
    return `<form action="/v4/login" method="post">
  <h1>Log In</h1>
      <button type="submit">${strategy}</button>
    </div>
  </form>`;
  }
  return `<form action="${action}" method="post">
    <h1>Log In</h1>
      <div>
        <label for="email">email</label>
        <input name="email" id="email" placeholder="email" />
      </div>
      <div>
        <label for="password">password</label>
        <input name="password" id="password" placeholder="password"/>
      </div>
      <div>
        <button type="submit">log In</button>
      </div>
    </form>`;
}
