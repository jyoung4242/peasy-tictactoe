import { UI } from "peasy-ui";
import "./style.css";

const template = `
    <div class='board'>
        <div  \${click@=>clicked}  \${cell<=*cells:id} class="cell \${cell.color}">\${cell.val}</div>
        <div \${===isButtonVisible} class="vic\${victory}"></div>
        <button \${click@=>reset} \${===isButtonVisible} class="button">RESET</button>
    </div>
`;

const toggle = () => {
  if (model.turn == "X") model.turn = "O";
  else model.turn = "X";
};

const checkForVictory = () => {
  //check rows
  console.log(model.cells);
  if (model.cells[0].val == model.cells[1].val && model.cells[1].val == model.cells[2].val && model.cells[0].val != "") {
    return 1;
  }
  if (model.cells[3].val == model.cells[4].val && model.cells[4].val == model.cells[5].val && model.cells[3].val != "") {
    return 2;
  }
  if (model.cells[6].val == model.cells[7].val && model.cells[7].val == model.cells[8].val && model.cells[6].val != "") {
    return 3;
  }
  if (model.cells[0].val == model.cells[3].val && model.cells[3].val == model.cells[6].val && model.cells[0].val != "") {
    return 4;
  }
  if (model.cells[1].val == model.cells[4].val && model.cells[4].val == model.cells[7].val && model.cells[1].val != "") {
    return 5;
  }
  if (model.cells[2].val == model.cells[5].val && model.cells[5].val == model.cells[8].val && model.cells[2].val != "") {
    return 6;
  }
  if (model.cells[0].val == model.cells[4].val && model.cells[4].val == model.cells[8].val && model.cells[0].val != "") {
    return 7;
  }

  if (model.cells[2].val == model.cells[4].val && model.cells[4].val == model.cells[6].val && model.cells[2].val != "") {
    return 8;
  }

  return null;
};

const setVictory = (rslt: any) => {
  model.isButtonVisible = true;
  model.victory = rslt;
};

const clearVictory = () => {
  model.isButtonVisible = false;
  model.victory = null;
  model.cells.forEach((cell: { val: string; color: string }) => {
    cell.val = "";
    cell.color = "";
  });
};

const getVal = () => {
  return model.turn;
};

const model = {
  turn: "X",
  cells: [] as any,
  clicked: (event: any, model: any, element: any, object: any) => {
    model.cell.val = getVal();
    if (model.cell.val == "X") model.cell.color = "blue";
    else model.cell.color = "red";
    toggle();
    const rslt = checkForVictory();
    if (rslt != null) setVictory(rslt);
  },
  isButtonVisible: false,
  victory: 1,
  reset: (event: any, model: any) => {
    clearVictory();
  },
};

for (let x = 0; x < 9; x++) {
  model.cells.push({
    id: x,
    color: "",
    val: "",
  });
}

UI.create(document.body, template, model);

setInterval(() => {
  UI.update();
}, 1000 / 60);
