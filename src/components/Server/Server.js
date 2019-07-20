import React from 'react'
import { css } from 'glamor'
import { Button } from 'evergreen-ui'
import Heading from 'components/Heading'
import PageTitle from 'components/PageTitle'

const Server = () => {
    return (
        <PageTitle>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                })}
            >
                <Heading>Server Details</Heading>

                <Button
                    iconBefore="add"
                    appearance="primary"
                >
                    Add Server
                </Button>
            </div>
        </PageTitle>
    )
}

export default Server
