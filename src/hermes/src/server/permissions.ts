import { rule, shield } from "graphql-shield"
import { AppContext } from "./context"
import { isNil } from 'lodash'

const rules = {
    isAuthenticatedUser: rule()((_, __, { user } : AppContext) => {
        return !isNil(user?.token)
    })
}

export const permissions = shield(
    {
        // Queries with rules go here.
    }
)