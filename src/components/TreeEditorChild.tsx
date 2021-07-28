import {ITreeEditorProps, ITreeItem, TElemType, TTreeItems} from "../common";
import React from "react";
import {FaPlus, FaChevronUp, FaChevronDown, FaTrash} from 'react-icons/fa';
import StyleOptions from "./StyleOptions";

interface ITreeEditorChildProps extends ITreeEditorProps {
  currentId: string
  depth: number
}

const TreeEditorChild = (props: ITreeEditorChildProps) => {
  const {tree, setTree, currentId, depth, setHoverId} = props

  const item: ITreeItem = tree.items[currentId]
  const children: ITreeItem[] = item.childrenIDs.map(childrenId => tree.items[childrenId])

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [classesTextValue, setClassesTextValue] = React.useState(item.classes.join(' '))
  const [addingElementType, setAddingElementType] = React.useState<TElemType>('div')

  const removeFromTree = () => {
    const newItems = Object.keys(tree.items).reduce((acc: TTreeItems, itemId) => {
      const current = tree.items[itemId]
      // Remove self
      if (itemId === item.id) {
        return acc
      }
      // Remove from parent
      acc[itemId] = {
        ...current,
        childrenIDs: current.childrenIDs.filter(i => i !== item.id)
      }
      return acc
    }, {})

    setTree({...tree, items: newItems})
  }

  const setNewClassValues = (value: string) => {
    setClassesTextValue(value)
    const newObjectClasses = value.split(' ').filter(i => i)
    const newItems = {...tree.items}
    newItems[currentId] = {...newItems[currentId], classes: newObjectClasses}

    const newClasses = {...tree.classes}

    setTree({
      ...tree,
      items: newItems,
      classes: newClasses,
    })
  }

  const setNewTextValue = (value: string) => {
    const newItems = {...tree.items}
    newItems[currentId] = {...newItems[currentId], textContent: value}
    setTree({...tree, items: newItems,})
  }

  const setNewUrlValue = (value: string) => {
    const newItems = {...tree.items}
    newItems[currentId] = {...newItems[currentId], urlContent: value}
    setTree({...tree, items: newItems,})
  }

  const appendElement = (type: TElemType) => {
    let id = Math.random().toString(36).substring(7);

    const newElement: ITreeItem = {
      id,
      type,
      childrenIDs: [],
      classes: [],
      textContent: '',
      urlContent: '',
    }
    const newItems = {...tree.items}
    newItems[id] = newElement
    newItems[currentId] = {
      ...newItems[currentId],
      childrenIDs: [...newItems[currentId].childrenIDs, id]
    }

    const newTree = {
      ...tree,
      items: newItems
    }

    setTree(newTree)
  }

  return <div
    className={`tree-editor-child depth-${depth}`}
  >
    <div
      className={'content'}
      onMouseEnter={() => {
        setHoverId(item.id)
      }}
      onMouseLeave={() => {
        setHoverId(undefined)
      }}
    >
      <div className={'header'} onClick={() => {
        setIsExpanded(!isExpanded)
      }}>
        <span className={'item-name'}>
          {item.type}
          {item.id !== tree.rootId &&
          <button
            onClick={(event) => {
              event.stopPropagation()
              removeFromTree()
            }}
          >
            <FaTrash/>
          </button>
          }
        </span>
        {isExpanded ? <FaChevronDown/> : <FaChevronUp/>}
      </div>
      {isExpanded && <div className={'options'}>
        <div className={'option'}>
          <span>Text content:</span>
          <input value={item.textContent} onChange={(event) => {
            setNewTextValue(event.target.value)
          }}/>
        </div>
        {(item.type === 'img' || item.type === 'a') &&
        <div className={'option'}>
          <span>Url content:</span>
          <input value={item.urlContent} onChange={(event) => {
            setNewUrlValue(event.target.value)
          }}/>
        </div>
        }
        <div className={'option'}>
          <span>Classes:</span>
          <input value={classesTextValue} onChange={(event) => {
            setNewClassValues(event.target.value)
          }}/>
        </div>
        <div className={'styles'}>
          {item.classes.map((classKey) => {
            return <StyleOptions key={classKey} className={classKey} {...props}/>
          })}
        </div>
      </div>}
    </div>
    <div className={'children'}>
      {children && children.map(child => {
        return <TreeEditorChild
          key={child.id}
          {...props}
          depth={depth + 1}
          currentId={child.id}
        />
      })}
      {isExpanded &&
      <div className={'add'}>
        <select
          onChange={(event) => {
            setAddingElementType(event.target.value as TElemType)
          }}
          value={addingElementType}
        >
          <option value={'div'}>div</option>
          <option value={'ul'}>ul</option>
          <option value={'li'}>li</option>
          <option value={'span'}>span</option>
          <option value={'img'}>img</option>
          <option value={'a'}>a</option>
        </select>
        <button
          onClick={() => {
            appendElement(addingElementType)
          }}
        ><FaPlus/></button>
      </div>
      }
    </div>
  </div>
}

export default TreeEditorChild
