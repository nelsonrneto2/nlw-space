import { prisma } from "../lib/prisma"
import {z} from 'zod'
import { FastifyInstance } from "fastify"

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories' , async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        converUrl: memory.converUrl,
        excert: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  app.get('/memories/:id', async (request) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })

  app.post('/memories' , async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPulic: z.coerce.boolean().default(false),
    })

    const { content, converUrl, isPulic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        converUrl,
        isPulic,
        userId: '6735d2ee-79a6-415a-81a7-3918165a512f',
      },
    })

    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPulic: z.coerce.boolean().default(false),
    })
    
    const { content, converUrl, isPulic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        converUrl,
        isPulic,
      },
    })

    return memory
  })

  app.delete('/memories/:id', async ( request ) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}