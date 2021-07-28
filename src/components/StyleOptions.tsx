import React from "react";
import {IStyle, IStyleChoice, ITreeEditorProps} from "../common";
import {FaPlus, FaChevronUp, FaChevronDown} from 'react-icons/fa';

const styleChoices: IStyleChoice[] = [
  {
    name: 'display',
    type: 'list',
    options: ['inline', 'block', 'flex']
  },
  {
    name: 'alignItems',
    type: 'list',
    options: ['stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit']
  },
  {
    name: 'justifyContent',
    type: 'list',
    options: ['space-between', 'space-around']
  },
  {
    name: 'flexDirection',
    type: 'list',
    options: ['row', 'column']
  },
  {
    name: 'backgroundColor',
    type: 'text',
  },
  {
    name: 'color',
    type: 'text',
  },
  {
    name: 'border',
    type: 'text',
  },
  {
    name: 'padding',
    type: 'text',
  },
  {
    name: 'margin',
    type: 'text',
  },
  {
    name: 'width',
    type: 'text',
  },
  {
    name: 'height',
    type: 'text',
  },
  {
    name: 'borderRadius',
    type: 'text',
  },
  {
    name: 'fontSize',
    type: 'text',
  },
]

interface IStyleOptionsProps extends ITreeEditorProps {
  className: string
}

const StyleOptions = ({tree, setTree, className}: IStyleOptionsProps) => {
  const styles: IStyle = tree.classes[className] || {}

  const [expanded, setExpanded] = React.useState(false)

  const setStyle = (choiceName: string, choiceValue: string | undefined) => {
    const newClasses = {...tree.classes}
    newClasses[className] = {...newClasses[className]}
    if (choiceValue === undefined || !choiceValue) {
      delete newClasses[className][choiceName]
    } else {
      newClasses[className][choiceName] = choiceValue
    }
    setTree({
      ...tree,
      classes: newClasses
    })
  }

  return <div className={'style-options'}>
    <div className={'class-name'} onClick={() => {
      setExpanded(!expanded)
    }}>
      <span>#{className}</span>
      {expanded ? <FaChevronDown/> : <FaChevronUp/>}
    </div>
    {expanded &&
    styleChoices.map((choice) => {
      const currentValue = styles[choice.name] || ''

      return <div className={'option'} key={choice.name}>
        <span className={'option-name'}>{choice.name}</span>
        {(choice.type === 'list' && choice.options) && <div className={'choice-list'}>
          <span
            className={'choice-option' + (currentValue === '' ? ' active' : '')}
            onClick={() => {
              setStyle(choice.name, undefined)
            }}
          >initial</span>
          {choice.options.map(choiceOption => {
            return <span
              key={choiceOption}
              className={'choice-option' + (choiceOption === currentValue ? ' active' : '')}
              onClick={() => {
                setStyle(choice.name, choiceOption)
              }}
            >
              {choiceOption}
            </span>
          })}
        </div>}
        {choice.type === 'text' && <input
          type={'text'}
          value={currentValue}
          onChange={(event) => {
            setStyle(choice.name, event.target.value)
          }}
        />}
        {choice.type === 'number' && <input
          type={'number'}
          value={currentValue}
          onChange={(event) => {
            setStyle(choice.name, event.target.value)
          }}
        />}
      </div>
    })
    }
  </div>
}

export default StyleOptions
