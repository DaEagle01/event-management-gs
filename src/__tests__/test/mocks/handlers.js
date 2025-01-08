import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('http://localhost:5000/api/events', async () => {
        return HttpResponse.json({
            message: 'Event created successfully!',
            data: {
                event: {
                    id: '123',
                    title: 'Test Event',
                    description: 'Test Description',
                    startTime: '2025-01-10T10:00:00Z',
                    endTime: '2025-01-10T12:00:00Z',
                    location: 'Test Location',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }
        })
    }),

    http.put('http://localhost:5000/api/events/:id', async ({ params }) => {
        return HttpResponse.json({
            message: 'Event updated successfully!',
            data: {
                event: {
                    id: params.id,
                    title: 'Updated Event',
                    description: 'Updated Description',
                    startTime: '2025-01-10T10:00:00Z',
                    endTime: '2025-01-10T12:00:00Z',
                    location: 'Updated Location',
                    updatedAt: new Date().toISOString()
                }
            }
        })
    })
]