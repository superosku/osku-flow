import {CSSProperties, Dispatch, SetStateAction} from "react";

export type TElemType = 'div' | 'ul' | 'li' | 'span' | 'img' | 'a'

export interface ITreeItem {
  id: string,
  type: TElemType,
  childrenIDs: string[]
  classes: string[]

  textContent: string
  urlContent: string
}

export interface IStyleChoice {
  name: string
  type: 'list' | 'number' | 'text'
  options?: string[]
}

export interface IStyle {
// export interface IStyle extends CSSProperties {
  [key: string]: string
}

export type TTreeItems = { [key: string]: ITreeItem }

export interface ITree {
  rootId: '1',
  classes: { [key: string]: IStyle },
  items: TTreeItems
}

export interface ITreeEditorProps {
  tree: ITree
  setTree: Dispatch<SetStateAction<ITree>>
  setHoverId: Dispatch<SetStateAction<string | undefined>>
}
