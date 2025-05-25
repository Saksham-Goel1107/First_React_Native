import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect,useState } from 'react'
import PageLoader from '@/components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import BalanceCard from '../../components/BalanceCard'
import {TransactionItem} from '../../components/TransactionItem'
import { COLORS } from '../../constants/colors'

export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const { Transactions,
    Summary,
    IsLoading,
    loadData,
    deleteTransaction, } = useTransactions(user.id)
    const onRefresh = async () => {
      setRefreshing(true)
      await loadData()
      setRefreshing(false) 
    }

  useEffect(() => {
    loadData()
  }, [loadData])
  if (IsLoading && !refreshing) return <PageLoader />
  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  }
  return (
    <View style={styles.container}>
      <View style={[styles.content, { flex: 1 }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain" />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCard summary={Summary} />
        <View style={{ flex: 1, minHeight: 300 }}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {(!Transactions || Transactions.length === 0) ? (
            <View style={{ 
              height: 250, 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: COLORS.card,
              borderRadius: 12,
              padding: 40,
              marginTop: 10
            }}>
              <Ionicons name="receipt-outline" size={40} color="#888" style={{ marginBottom: 10 }} />
              <Text style={{ 
                textAlign: 'center', 
                color: '#888', 
                fontSize: 16, 
                fontWeight: '500' 
              }}>
                No transactions found.
              </Text>
              <TouchableOpacity 
                style={{ 
                  marginTop: 20, 
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => router.push('/create')}
              >
                <Ionicons name="add-circle-outline" size={18} color="#FFF" />
                <Text style={{ color: '#FFF', marginLeft: 5, fontWeight: '500' }}>Add Transaction</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              style={{ marginTop: 10, height: 300 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              data={[...Transactions].reverse()}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => (
                <TransactionItem item={item} onDelete={handleDelete} />
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
          )}
        </View>
      </View>
    </View>
  )
}