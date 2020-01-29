import { css } from 'glamor'
import client from 'utils/axios'
import { withAuth } from 'utils/hoc'
import React, { useState, Fragment } from 'react'
import useScript from 'react-script-hook'

import { Text, Dialog, Button, toaster, withTheme } from 'evergreen-ui'

import Loader from 'components/Loader'
import Section from 'components/Section'
import Heading from 'components/Heading'
import SegmentedControl from 'components/SegmentedControl'

const Subscriptions = ({ auth, theme }) => {
    const [user, setUser] = auth
    const [fetchingUser, setFetchingUser] = useState(false)
    const [confirmingCancelPlan, setConfirmingCancelPlan] = useState(false)
    const [plan, setPlan] = useState(user.subscription.plan)
    const [loading, error] = useScript({
        src: 'https://cdn.paddle.com/paddle/paddle.js',
        onload: () => {
            window.Paddle.Setup({
                vendor: parseInt(process.env.REACT_APP_PADDLE_VENDOR_ID)
            })
        }
    })

    const planStyles = {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        paddingLeft: '3rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        borderRadius: '3px'
    }

    const plans = [
        {
            title: 'PRO',
            value: 'pro',
            name: 'pro',
            price: '9',
            id: parseInt(process.env.REACT_APP_PADDLE_PRO_PLAN_ID),
            features: [
                'Unlimited Sites',
                'Unlimited Servers',
                'Unlimited Deployments'
            ]
        },
        {
            title: 'BUSINESS',
            value: 'business',
            name: 'business',
            price: '29',
            id: parseInt(process.env.REACT_APP_PADDLE_BUSINESS_PLAN_ID),
            features: [
                'Unlimited Sites',
                'Unlimited Teams',
                'Unlimited Servers',
                'Unlimited Deployments',
                'Unlimited Collaborators'
            ]
        }
    ]

    const cancelPlan = () => {
        setFetchingUser(true)

        client
            .delete('subscription/cancel')
            .then(({ data }) => {
                setUser(data)

                toaster.success(`Your plan has been cancelled.`)
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => {
                setFetchingUser(false)
                setConfirmingCancelPlan(false)
            })
    }

    const updatePlan = selectedPlan => {
        setFetchingUser(true)

        client
            .patch('subscription/update', {
                plan: selectedPlan.value
            })
            .then(({ data }) => {
                setUser(data)

                toaster.success(
                    `Plan has been updated to ${selectedPlan.value}`
                )
            })
            .catch(({ response }) => {
                response &&
                    response.data &&
                    response.data.message &&
                    toaster.danger(response.data.message)
            })
            .finally(() => {
                setFetchingUser(false)
            })
    }

    const openPaddle = selectedPlan => {
        window.Paddle.Checkout.open({
            product: selectedPlan.id,
            email: user.email,
            successCallback: data => {
                setFetchingUser(true)

                setTimeout(() => {
                    client
                        .get('/me')
                        .then(({ data }) => {
                            setUser(data)
                        })
                        .catch(() => {
                            toaster.danger(
                                'Something went wrong fetching your account.'
                            )
                        })
                        .finally(() => {
                            setFetchingUser(false)
                        })
                }, 5000)
            }
        })
    }

    const getBorderColor = plan => {
        if (plan.value === 'business') {
            return user.subscription.plan === 'business'
                ? theme.colors.intent.success
                : theme.colors.border.default
        }

        return user.subscription.plan === 'pro'
            ? theme.colors.intent.success
            : theme.colors.border.default
    }

    const renderPlan = plan => (
        <div
            className={css({
                ...planStyles,
                border: `2px solid ${getBorderColor(plan)}`
            })}
        >
            <Text marginLeft="1.5rem" marginBottom="2rem">
                {plan.title}
            </Text>
            <div
                className={css({
                    display: 'flex'
                })}
            >
                <Heading
                    marginLeft="1.5rem"
                    marginBottom="30px"
                    fontSize="28px"
                >
                    ${plan.price}/
                </Heading>
                mon
            </div>
            {plan.features.map(feature => (
                <div
                    key={feature}
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px'
                    })}
                >
                    <svg
                        className={css({
                            marginRight: '10px',
                            marginTop: '-4px'
                        })}
                        width={16}
                        height={12}
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.9973 1.65991L5.89727 10.7599L1.69727 6.55991"
                            stroke="url(#paint0_linear)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="8.34727"
                                y1="1.65991"
                                x2="8.34727"
                                y2="10.7599"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#23C277" />
                                <stop offset={1} stopColor="#399D6C" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <Text>{feature}</Text>
                </div>
            ))}

            <div
                className={css({
                    display: 'flex',
                    marginLeft: '1.5rem',
                    marginTop: '1.5rem'
                })}
            >
                {/* if we're rendering business */}
                {user.subscription.plan === plan.value && (
                    <Text fontWeight="bold" fontSize="18px">
                        Your current plan
                    </Text>
                )}

                {user.subscription.plan !== plan.value &&
                    user.subscription.plan !== 'free' && (
                        <Button
                            marginTop={10}
                            intent="success"
                            appearance="primary"
                            isLoading={fetchingUser}
                            onClick={() => updatePlan(plan)}
                        >
                            {user.subscription.plan === 'pro'
                                ? 'Upgrade to Plan'
                                : 'Downgrade to plan'}
                        </Button>
                    )}

                {user.subscription.plan === 'free' && (
                    <Button
                        marginTop={10}
                        intent="success"
                        appearance="primary"
                        isLoading={fetchingUser}
                        onClick={() => openPaddle(plan)}
                    >
                        Subscribe
                    </Button>
                )}
            </div>
        </div>
    )

    if (loading) return <Loader />

    if (error)
        return (
            <Text
                className={css({
                    textAlign: 'center',
                    margin: '20px'
                })}
            >
                Error loading Payment library. Please try again later.
            </Text>
        )

    return (
        <Fragment>
            <Section
                title="Subscription"
                description="Update your Nesabox subscription plan."
            >
                <div
                    className={css({
                        display: 'flex'
                    })}
                >
                    {renderPlan(plans[0])}

                    <div
                        className={css({
                            width: '5%'
                        })}
                    ></div>

                    {renderPlan(plans[1])}
                </div>
            </Section>
            {user.subscription.plan !== 'free' && (
                <Section
                    title="Cancel Subscription"
                    description="Cancel your current subscription plan and return to the free plan."
                >
                    <Button
                        marginTop={10}
                        intent="danger"
                        appearance="primary"
                        isLoading={fetchingUser}
                        onClick={() => setConfirmingCancelPlan(true)}
                    >
                        {`Cancel your ${user.subscription.plan} plan`}
                    </Button>

                    <Dialog
                        intent="danger"
                        onConfirm={cancelPlan}
                        isShown={confirmingCancelPlan}
                        confirmLabel="Cancel your plan"
                        isConfirmLoading={fetchingUser}
                        onCloseComplete={() => setConfirmingCancelPlan(false)}
                        title={`Cancel your ${user.subscription.plan} plan`}
                    >
                        <Text
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            Are you sure you want to cancel your plan ?
                        </Text>
                    </Dialog>
                </Section>
            )}
        </Fragment>
    )
}

export default withTheme(withAuth(Subscriptions))
