import '../styles/globals.css'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import PageLayout from '../components/pageLayout'

const theme = extendTheme({
  colors:{

    gray:{
      100: '#F5F5F5',
      200: '#E1E1E1',
      300: 'C3C3C3',
      400: 'AAAAAA',
      500: '919191',
      600: '787878',
      700: '5F5F5F',
      800: '464646',
      900: '232323',
    },
  },
  components:{
    Button:{
      variants:{
        link:{
          ":focus":{
            outline:'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PageLayout>
      <Component {...pageProps} />
      </PageLayout>
    </ChakraProvider>
  )
}

export default MyApp
