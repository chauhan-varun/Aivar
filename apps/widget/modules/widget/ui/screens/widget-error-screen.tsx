import { WidgetHeader } from '../components/widget-header'
import { useAtomValue } from 'jotai'
import { errorMessageAtom } from '../../atoms/widget-atoms'
import { AlertTriangleIcon } from 'lucide-react'
export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom)

  return (
    <div className="flex flex-col h-full">
      <WidgetHeader>
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
          <AlertTriangleIcon className="w-12 h-12 mb-4 text-red-500" />
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">Something went wrong</h2>
          <p className="text-gray-800">An error occurred while loading the widget.</p>
          {errorMessage && (
            <pre className="mt-4 p-2 bg-gray-100 text-red-600 rounded">{errorMessage}</pre>
          )}
        </div>
      </WidgetHeader>
    </div>
  )
}
