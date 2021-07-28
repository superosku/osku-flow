import React from "react";
import {IStyle, ITree, ITreeItem} from "../common";

interface ITreeRendererNodeProps {
  tree: ITree
  currentId: string
  hoverId: string | undefined
}

const TreeRendererNode = (props: ITreeRendererNodeProps) => {
  const {tree, currentId, hoverId} = props

  const item: ITreeItem = tree.items[currentId]
  const children: ITreeItem[] = item.childrenIDs.map(childrenId => tree.items[childrenId])
  const styles: IStyle[] = item.classes.map(className => tree.classes[className])

  const style = styles.reduce((a, b) => {
    return {
      ...a,
      ...b,
    }
  }, {})

  let className = ''
  if (hoverId === currentId) {
    className = 'highlight'
  }

  const content = <>
    {item.textContent && item.textContent}
    {children && children.map(c => {
      return <TreeRendererNode
        key={c.id}
        {...props}
        currentId={c.id}
      />
    })}
  </>

  if (item.type === 'div') {
    return <div style={style} className={className}>{content}</div>
  } else if (item.type === 'span') {
    return <span style={style} className={className}>{content}</span>
  } else if (item.type === 'ul') {
    return <ul style={style} className={className}>{content}</ul>
  } else if (item.type === 'li') {
    return <li style={style} className={className}>{content}</li>
  } else if (item.type === 'img') {
    return <img style={style} src={item.urlContent} className={className}/>
  } else if (item.type === 'a') {
    return <a style={style} href={item.urlContent} className={className}>{content}</a>
  }

  return <span>Something is missing {item.id}</span>

  // return <div className={'tree-renderer'}>
  //   <span>Site comes here</span>
  // </div>
}

interface ITreeRendererProps {
  tree: ITree
  hoverId: string | undefined
}

const TreeRenderer = ({tree, hoverId}: ITreeRendererProps) => {
  return <div className={'tree-renderer'}>
    <TreeRendererNode tree={tree} hoverId={hoverId} currentId={tree.rootId}/>
  </div>
}

export default TreeRenderer
