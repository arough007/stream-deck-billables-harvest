import { Settings, User, TimeEntry, StartEndDates } from '../types'

const harvestUrl = 'https://api.harvestapp.com/v2'

/**
 * Fetch data from the harvest api.
 *
 * Fetches harvestUrl + path + ?arg1=val1&arg2=val2&etc
 *
 * @param {Settings} settings
 * @param {string} path
 * @param {object} args
 * @returns {Promise<object[]>} json response
 */
export const getHarvest = async (
  settings: Settings,
  path: string,
  args?: object
) => {
  let url = harvestUrl + path
  if (args) {
    let params = Object.keys(args)
      .map(function (key) {
        return key + '=' + args[key]
      })
      .join('&')
    url += '?' + params
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${settings.harvestAccountToken}`,
      'Harvest-Account-Id': settings.harvestAccountId,
    },
  }).then((res) => {
    return res.json()
  })
  return response
}

/**
 * Get current user id.
 *
 * @param {Settings} settings
 * @returns {Promise<number>}
 */
export const getHarvestUserId = async (settings: Settings): Promise<number> => {
  const user: User = await getHarvest(settings, '/users/me')
  return user.id
}

/**
 * Get time entries.
 *
 * @param {Settings} settings
 * @param {number} userId
 * @param {StartEndDates} startEnd
 * @returns {Promise<TimeEntry[]>}
 */
export const getTimeEntries = async (
  settings: Settings,
  userId: number,
  startEnd: StartEndDates
): Promise<TimeEntry[]> => {
  let timeEntries: TimeEntry[] = []

  // Get tracked hours.
  const trackedHoursResponse = await getHarvest(settings, '/time_entries', {
    user_id: userId,
    from: startEnd.start,
    to: startEnd.end,
  })
  if (typeof trackedHoursResponse.error !== 'undefined') {
    throw new Error(trackedHoursResponse.error_description)
  }
  if (
    typeof trackedHoursResponse.time_entries !== 'undefined' &&
    trackedHoursResponse.time_entries.length
  ) {
    trackedHoursResponse.time_entries.forEach((entry: TimeEntry) => {
      timeEntries.push(entry)
    })
  }

  return timeEntries
}
