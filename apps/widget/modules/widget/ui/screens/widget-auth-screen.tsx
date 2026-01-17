import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { WidgetHeader } from '../components/widget-header'
import { useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { Doc } from '@workspace/backend/_generated/dataModel'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
})

const organizationId = 'demo-organization'

export const WidgetAuthScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const createContactSession = useMutation(api.public.contactSessions.create)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!organizationId) {
      console.error('Organization ID is missing')
      return
    }
    const metadata: Doc<'contactStorage'>['metadata'] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(', '),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenresolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeoffset: new Date().getTimezoneOffset(),
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || 'direct',
      currentUrl: window.location.href,
    }
    const contactSessionId = await createContactSession({
      name: data.name,
      email: data.email,
      organizationId,
      metadata,
    })
      .then((id) => {
        console.log('Contact session created successfully')
        return id
      })
      .catch((error) => {
        console.error('Error creating contact session:', error)
        return undefined
      })

    console.log('Contact Session ID:', contactSessionId)
  }
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-y-4 p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="Your Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="Your Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button disabled={form.formState.isSubmitting} type="submit">
            Continue
          </button>
        </form>
      </Form>
    </>
  )
}
