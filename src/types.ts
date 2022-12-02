// User settings from stream deck button config.
export interface Settings {
  harvestAccountToken: string
  harvestAccountId: string
  forecastAccountId: string
}

// Response from Forecast, with additional properties.
export class Project {
  id: number
  name: string
  harvest_id: number
  color: string
  code: string
  notes: string
  start_date: string
  end_date: string
  archived: boolean
  updated_at?: string
  updated_by_id?: number
  client_id?: number
  tags?: string[]
  budget_by?: string
  hours?: number
  billable?: boolean
  hours_logged?: number
  hours_schedule?: HoursSchedule
}

export type HoursSchedule = {
  [day: number]: number
}

// Response from Forecast, with additional properties.
export interface RemainingBudgetedHours {
  project_id: number
  budget_by: string
  hours: number
  response_code: number
}

// Response from Harvest, with additional properties.
export class TimeEntry {
  id: number
  hours: number
  rounded_hours: number
  hours_without_timer: number
  is_locked: boolean
  locked_reason: string
  is_closed: boolean
  is_billed: boolean
  timer_started_at: string
  started_time: string
  ended_time: string
  is_running: boolean
  billable: boolean
  budgeted: boolean
  billable_rate: number
  cost_rate: number
  spent_date: string
  notes: string
  created_at: string
  updated_at: string
  user: {
    id: number
    name: string
  }
  client: {
    id: number
    name: string
    currency: string
  }
  project: {
    id: number
    name: string
    code: string
  }
  task: {
    id: number
    name: string
  }
  user_assignment?: {
    id: number
    is_project_manager: boolean
    is_active: boolean
    use_default_rates: boolean
    budget: boolean
    created_at: string
    updated_at: string
    hourly_rate: number
  }
  task_assignment?: {
    id: number
    billable: boolean
    is_active: boolean
    created_at: string
    updated_at: string
    hourly_rate: number
    budget: number
  }
  invoice?: object
  external_reference?: object
}
