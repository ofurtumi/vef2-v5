export default function Custom404() {
	const divstyle = {
		width: '100%',
    height: "95vh",
    display: 'flex',
    "justify-content": "center",
    "align-items": "center",
		margin: '0',
    padding: '0'
	};

  const h1style = {
    font: "bold 5em arial"
  }

	return (
		<div style={divstyle}>
			<h1 style={h1style}>404 - Engin síða hérna</h1>
		</div>
	);
}
