interface Step {
  step: number
  title: string
  description: string
  duration: string
}

interface ProcessTimelineProps {
  steps: Step[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border hidden sm:block" aria-hidden="true" />

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex gap-4">
            {/* Step number bubble */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center z-10">
              <span className="text-white text-sm font-bold">{step.step}</span>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border border-border rounded-xl2 p-4 shadow-card pt-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-navy text-base">{step.title}</h4>
                <span className="text-xs text-charcoal/50 bg-cream px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  {step.duration}
                </span>
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
