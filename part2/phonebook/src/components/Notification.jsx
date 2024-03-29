
const successStyle = {
  color: 'green',
  background: 'white',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'white',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('error')){
      return (
        <div style={errorStyle} className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div style={successStyle} className="error">
          {message}
        </div>
      )
    }
  }

export default Notification;