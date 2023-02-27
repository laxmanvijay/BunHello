import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia'

const app = new Elysia()

interface INote {
    id: string;
    content: string;
}

const notes: INote[] = []

app.get('/ping', () => 'pong')

app.get('/', () => notes)

app.get('/:id', (ctx) => notes.filter(n => n.id === ctx.params.id))

app.post('/', (ctx) => {
    const note = ctx.body as INote;

    note.id = crypto.randomUUID()

    notes.push(note);

    return note;
})

app.put('/:id', (ctx) => {
    const note = ctx.body as INote;

    const currentNote = notes.find(n => n.id === ctx.params.id)

    if (!currentNote) {
        throw new Error("NOT_FOUND")
    }

    currentNote.content = note.content;

    return currentNote;
})

app.delete('/:id', (ctx) => {
    const currentNoteIdx = notes.findIndex(n => n.id === ctx.params.id)

    if (currentNoteIdx < 0) {
        throw new Error("NOT_FOUND")
    }

    notes.splice(1, currentNoteIdx);

    return;
})

app.onError(({ code, error, set }) => {
    if (error.message === 'NOT_FOUND') {
        set.status = 404
    
        return 'Not Found :('
    }
})

app.use(cors())

app.listen(4000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
