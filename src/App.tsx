import React, {Dispatch, SetStateAction} from 'react';
import './App.scss';
import {ITree, ITreeEditorProps} from "./common";
import TreeEditorChild from "./components/TreeEditorChild";
import TreeRenderer from "./components/TreeRenderer";

import initialJson from "./initialState.json"

const TreeEditor = (props: ITreeEditorProps) => {
  const {setHoverId} = props;

  return <div
    className={'tree-editor'}
    onMouseLeave={() => {setHoverId(undefined)}}
  >
    <TreeEditorChild currentId={props.tree.rootId} {...props} depth={0} />
  </div>
}

const App = () => {
  const [hoverId, setHoverId] = React.useState<undefined | string>(undefined)

  const [tree, setTree] = React.useState<ITree>(initialJson as ITree)

  const setTreeWithSave: Dispatch<SetStateAction<ITree>> = (value: SetStateAction<ITree>) => {
    setTree(value)
  }

  return (
    <div className={"oskuflow"}>
      <div className="menu">
        <span className={'brand'}>OskuFlow</span>
        <span className={'action'} onClick={() => {
          const stringValue = localStorage.getItem('saved')
          if (stringValue) {
            setTree(JSON.parse(stringValue))
          }
        }}>Load from localstorage</span>
        <span className={'action'} onClick={() => {
          const stringValue = JSON.stringify(tree)
          localStorage.setItem('saved', stringValue)
          console.log(stringValue)
        }}>Save to localstorage</span>
      </div>
      <div className="main">
        <TreeRenderer tree={tree} hoverId={hoverId} />
        <TreeEditor tree={tree} setTree={setTreeWithSave} setHoverId={setHoverId} />
      </div>
    </div>
  );
}

export default App;
