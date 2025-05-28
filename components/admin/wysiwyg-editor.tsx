"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

interface WysiwygEditorProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export default function WysiwygEditor({ id, value, onChange }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    updateValue()
  }

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleLinkInsert = () => {
    const url = prompt("Insira a URL do link:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const handleImageInsert = () => {
    const url = prompt("Insira a URL da imagem:", "https://")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} title="Negrito">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} title="Itálico">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("underline")} title="Sublinhado">
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          title="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyLeft")}
          title="Alinhar à esquerda"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyCenter")}
          title="Centralizar"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("justifyRight")}
          title="Alinhar à direita"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <Button type="button" variant="ghost" size="sm" onClick={handleLinkInsert} title="Inserir link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleImageInsert} title="Inserir imagem">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        id={id}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        onInput={updateValue}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  )
}
