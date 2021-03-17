import overlay from "./overlay"


export default function renderDeath() {
	const html = `
  <h3>You lost!</h3>
  <p>your final score is: placeholder</p>
  <p>your time played this run is: placeholder</p>
  <p>please enter your name below</p>
  <input type="text" id="myText" maxLength="4"/>
  <button class = 'close' onclick = 'overlay()>accept</button>
  `
  overlay()
}