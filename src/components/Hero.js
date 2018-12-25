import React from 'react'
import { Box, Heading, Button, Text, Image, ResponsiveContext } from 'grommet'
import { graphql, StaticQuery } from 'gatsby'
import ConfigContext from './ConfigContext'

const Hero = () => (
  <ConfigContext.Consumer>
    {appConfig => (
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            a11yTitle="Calendar events title"
            align="center"
            flex="grow"
            height="100vh"
            justify="center"
            pad="medium"
          >
            <StaticQuery
              query={graphql`
                {
                  imageSharp {
                    original {
                      src
                    }
                  }
                }
              `}
              render={data => {
                const { src } = data.imageSharp.original
                return (
                  <Box
                    width={size === 'small' ? 'xsmall' : 'small'}
                    height={size === 'small' ? 'xsmall' : 'small'}
                    margin={{ bottom: 'medium' }}
                    responsive
                  >
                    <Image fit="contain" src={src} />
                  </Box>
                )
              }}
            />
            <Heading size="large" align="center">
              {appConfig.title}
            </Heading>
            <Heading align="center">{appConfig.subTitle}</Heading>

            <Box
              direction={size === 'small' ? 'column' : 'row'}
              margin={{ top: 'large' }}
              gap="medium"
            >
              <Button
                href="#calendars"
                label={
                  <Text size="large" margin="small">
                    See all the events
                  </Text>
                }
                a11yTitle="See all the events"
                primary
              />
              <Button
                href={appConfig.formLink}
                label={
                  <Text size="large" margin="small">
                    Add your event!
                  </Text>
                }
                a11yTitle="Click to add your event"
                color="secondary"
                target="_blank"
              />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )}
  </ConfigContext.Consumer>
)

export default Hero
