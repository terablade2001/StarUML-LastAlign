let selectedViews
function getSelectedViews() {
  selectedViews = app.selections.getSelectedViews()
  if (selectedViews.length <= 0) {
    app.toast.error("No views have been selected!")
    return -1
  }
	if (selectedViews.length == 1) {
		app.toast.error("Only one view been selected! At least two are required!")
		return -1
	}
  return 0
}


function alignView(alignType) {
	if (getSelectedViews() != 0)  { return 0 }
	let lastView = selectedViews[selectedViews.length-1]
	let lastPosition = [lastView.left, lastView.top, lastView.width, lastView.height]
	for (var selView of selectedViews) {
		if (selView == lastView) continue;
		switch (alignType) {
			case 0: { // align Left
				selView.left = lastView.left
				break
			}
			case 1: { // align Center
				selView.left = lastView.left + (lastView.width - selView.width)/2.0
				break
			}
			case 2: { // align Right
				selView.left = lastView.left + lastView.width - selView.width
				break
			}
			case 3: { // align Top
				selView.top = lastView.top
				break
			}
			case 4: { // align Middle
				selView.top = lastView.top + (lastView.height - selView.height)/2.0
				break
			}
			case 5: { // align Bottom
				selView.top = lastView.top + lastView.height - selView.height
				break
			}
			default:
				app.toast.error("unexpected case")
		}
		app.diagrams.getCurrentDiagram().drawDiagram
	}
	app.diagrams.repaint()
}

function horizAlignLeft() {
  alignView(0)
}
function horizAlignCenter() {
  alignView(1)
}
function horizAlignRight() {
  alignView(2)
}

function vertAlignTop() {
  alignView(3)
}
function vertAlignMiddle() {
  alignView(4)
}
function vertAlignBottom() {
  alignView(5)
}

function init () {
  app.commands.register('LastAlign:horizAlignLeft', horizAlignLeft)
  app.commands.register('LastAlign:horizAlignCenter', horizAlignCenter)
  app.commands.register('LastAlign:horizAlignRight', horizAlignRight)
  app.commands.register('LastAlign:vertAlignTop', vertAlignTop)
  app.commands.register('LastAlign:vertAlignMiddle', vertAlignMiddle)
  app.commands.register('LastAlign:vertAlignBottom', vertAlignBottom)
}

exports.init = init;