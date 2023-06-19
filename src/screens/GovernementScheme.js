import React, { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

const screenWidth = Dimensions.get("window").width;
const GovernmentScheme = () => {
  const [searchText, setSearchText] = useState("");
  const [governmentSchemes, setGovernmentSchemes] = useState([
    {
      organization: "Ministry Of Minority Affairs",
      scheme: "Pre Matric Scholarship For Minorities",
      description:
        "A scholarship scheme by Ministry of Minority Affairs for students from minority communities studying in Class 1st to Class 10th in India in a government or private school, including such residential G...",
      categories: [
        "Admission Fee",
        "Education",
        "Minority",
        "Pre-matric",
        "Scholarship",
        "School",
        "Student",
        "Social Welfare",
      ],
      details:
        "A scholarship scheme by Ministry of Minority Affairs for students from minority communities studying in Class 1st to Class 10th in India in a government or private school, including such residential Government institutes and eligible private institutes selected and notified in a transparent manner by the State Government and Union Territory Administration concerned. A total of thirty (30) lakh scholarships are targeted to be distributed as Fresh Scholarships, besides, Renewal scholarships. Scholarship will be awarded to the students who have secured not less than 50% marks in the previous final examination and annual income of their parents/guardian from all sources does not exceed Rs. 1.00 lakh. The scheme aims to encourage parents from minority communities to send their school going children to school, lighten their financial burden on school education and sustain their efforts to support their children to complete school education. The scheme will form the foundation for their educational attainment and provide a level playing field in the competitive employment arena.",
      benefits: [
        "Admission Fee (Class 6th to Class 10th): Rs. 500/- per annum subject to actuals (both Hosteller & Day Scholar)",
        "Tuition Fee (Class 6th to Class 10th): Rs. 350/- per month subject to actuals (both Hosteller & Day Scholar)",
        "Maintenance Allowance (Class 1st to Class 5th*): Rs. 100/- per month for Day Scholar.",
        "Maintenance Allowance (Class 6th to Class 10th*): Rs. 600/- per month for Hosteller; Rs. 100/-per month for Day Scholar.",
      ],
      eligibility: [
        "The applicant must be a student in a class between Class 1st to 10th.",
        "The applicant must be from a Minority Community.",
        "The Annual income of parents/guardians of the applicant (from all sources) should be less than or equal to ₹ 1 Lakh per Annum.",
        "The applicant should have secured not less than 50% marks in the previous final examination.",
        "The applicant must not be availing any other scholarship by the govt.",
        "The applicant must not be the third sibling in his/her family who has been given this scholarship.",
      ],
      applicationProcess: [
        "Keep ready the soft copies of the required documents.",
        "Step 1: Go to http://www.scholarships.gov.in/. and click “New Registration”.Guidelines for Registration will appear. Scroll to the bottom. Read carefully the undertaking. Accept the Terms. Click “Continue”.",
        "Step 2:  A Registration Form will appear. (The fields marked as * are compulsory) Fill the details and click “Register”. Your Application ID and password will be displayed. The same will also be sent as an SMS on your registered mobile number. ",
        "Step 3:  Go to https://scholarships.gov.in/fresh/newstdRegfrmInstruction Click on “Login to Apply”. Enter your Application ID and password. Type the Captcha and click “Login”. On the next screen, provide the OTP received on your registered mobile number. You will be directed to the Password Reset screen. Create a new password and confirm. Click “Submit”. You will be directed to the “Applicant’s Dashboard”.",
        "Step 4:  On the left pane, click “Application Form”. The fields marked as * are compulsory. Fill the details and upload the documents. You can either click on “Save as Draft” to complete the application later. Else, click “Final Submit” to submit the application.",
      ],
      requiredDocuments: [
        "Student’s Photo",
        "Verification Form by the Institution",
        "Income Certificate, issued from a Competent Authority in the State/UT Govts is required in respect of parent/guardian of the student",
        "Self-Certified Community Certificate (if the applicant is greater than or equal to 18 years)",
        "Community Certificate certified by parent/guardian",
        "Self-attested Mark Sheet of the last qualifying exam",
        "Fee Receipt of ‘Current Course Year'",
        "Bank Details (Account No., IFSC Code) of the applicant",
        "Bank Details of the Parent/Guardian (if the student does not have his/her own bank account)",
        "Residential/Domicile Certificate",
        "Aadhaar Number (or alternative identification documents)",
        "“Bonafide Student Certificate” from the School (if School is located in a State/UT different from domicile State/UT)",
      ],
    },
    {
      organization: "Ministry of Education",
      scheme: "Affordable Education Scheme",
      description:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students...",
      categories: [
        "Education",
        "Affordable",
        "Scholarship",
        "Tuition",
        "School",
        "Students",
        "Financial Aid",
      ],
      details:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students studying in both government and private schools, from primary to higher secondary levels. Under this scheme, eligible students can receive scholarships to cover their tuition fees, textbooks, and other educational expenses. The scheme also offers mentorship programs and career counseling to help students make informed choices about their future. The objective of this scheme is to reduce the financial burden on families and promote equal educational opportunities for all.",
      benefits: [
        "Full or partial tuition fee coverage for eligible students",
        "Free textbooks and educational materials",
        "Mentorship programs and career counseling",
        "Access to educational resources and learning tools",
        "Financial assistance for extracurricular activities and educational trips",
      ],
      eligibility: [
        "Students from economically disadvantaged backgrounds",
        "Enrolled in a recognized government or private school",
        "Good academic performance",
        "Fulfillment of income criteria set by the scheme",
      ],
      applicationProcess: [
        "Obtain the application form from the designated education authority or school",
        "Complete the application form with accurate information",
        "Attach the required documents, including income proof, academic records, and identity proof",
        "Submit the application form to the designated authority or school",
        "Applications will be reviewed, and eligible students will be notified of their acceptance",
      ],
      requiredDocuments: [
        "Proof of income (salary slips, income certificate, etc.)",
        "Academic records or report cards",
        "Identity proof (Aadhaar card, birth certificate, etc.)",
        "Residence proof",
        "Passport-sized photographs",
      ],
    },
    {
      organization: "Ministry of Power",
      scheme: "Energy Efficiency Bill Scheme",
      description:
        "The Energy Efficiency Bill Scheme is aimed at promoting energy conservation and reducing electricity bills for households. Under this scheme, eligible households can receive financial incentives and s...",
      categories: [
        "Energy",
        "Efficiency",
        "Bills",
        "Savings",
        "Environment",
        "Renewable Energy",
      ],
      details:
        "The Energy Efficiency Bill Scheme is aimed at promoting energy conservation and reducing electricity bills for households. Under this scheme, eligible households can receive financial incentives and support to implement energy-efficient measures in their homes. The scheme encourages the use of renewable energy sources, such as solar panels, and provides subsidies for their installation. It also offers guidance on energy-saving practices, conducts energy audits, and provides recommendations for optimizing energy consumption. By adopting energy-efficient practices, households can reduce their carbon footprint and contribute to a sustainable environment while enjoying reduced energy bills.",
      benefits: [
        "Financial incentives for energy-efficient home upgrades",
        "Subsidies for the installation of solar panels",
        "Energy audits and recommendations for optimizing energy consumption",
        "Educational materials on energy-saving practices",
        "Reduced electricity bills",
      ],
      eligibility: [
        "Residential households",
        "Applicants must own the property or have consent from the property owner",
        "Fulfillment of criteria related to energy consumption and potential for energy savings",
      ],
      applicationProcess: [
        "Contact the designated energy efficiency authority or visit theirwebsite",
        "Fill out the application form with relevant information",
        "Provide details about your current energy consumption and potential for energy savings",
        "Submit the application along with any required supporting documents",
        "The designated authority will review the application and conduct an energy audit if necessary",
        "Eligible households will be notified of their acceptance into the scheme",
      ],
      requiredDocuments: [
        "Proof of ownership or consent from the property owner",
        "Energy bills or consumption data for the past few months",
        "Identification proof (Aadhaar card, driver's license, etc.)",
        "Address proof",
        "Photographs of the property (if required)",
      ],
    },
    {
      organization: "Ministry of Health and Family Welfare",
      scheme: "Improving Access to Healthcare Services",
      description:
        "The Healthcare Access Program aims to ensure that every individual has access to affordable and quality healthcare services. Under this scheme, eligible individuals...",
      categories: [
        "Healthcare",
        "Medical Services",
        "Access",
        "Affordable",
        "Health Insurance",
        "Public Health",
      ],
      details:
        "The Healthcare Access Program aims to ensure that every individual has access to affordable and quality healthcare services. Under this scheme, eligible individuals can avail medical services, including doctor consultations, hospitalization, diagnostic tests, and medicines, at subsidized rates or free of cost. The program also provides health insurance coverage for those who cannot afford medical expenses. Additionally, the scheme focuses on preventive healthcare and promotes awareness campaigns to educate the public about healthy living practices and disease prevention. By implementing this program, the government aims to improve the overall health and well-being of the population and reduce the burden of healthcare expenses on individuals and families.",
      benefits: [
        "Subsidized or free medical consultations and treatments",
        "Access to affordable medicines and diagnostic tests",
        "Health insurance coverage for eligible individuals",
        "Preventive healthcare services and awareness campaigns",
        "Reduced financial burden on healthcare expenses",
      ],
      eligibility: [
        "Residents of the country",
        "Income-based eligibility criteria for subsidized services",
        "No income criteria for preventive healthcare and awareness campaigns",
      ],
      applicationProcess: [
        "Visit the designated healthcare center or hospital",
        "Provide necessary identification and income-related documents",
        "Complete the application form with accurate information",
        "Undergo an assessment based on the eligibility criteria",
        "Once approved, receive a healthcare access card or identification number",
        "Present the card or number during healthcare service utilization",
      ],
      requiredDocuments: [
        "Identification proof (Aadhaar card, voter ID, etc.)",
        "Proof of residence",
        "Income certificate or proof of income (for subsidized services)",
        "Other relevant medical documents, if any",
      ],
    },
    {
      organization: "Ministry of Education",
      scheme: "Affordable Education Scheme",
      description:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students...",
      categories: [
        "Education",
        "Affordable",
        "Scholarship",
        "Tuition",
        "School",
        "Students",
        "Financial Aid",
      ],
      details:
        "The Affordable Education Scheme aims to provide financial assistance to students from economically disadvantaged backgrounds to ensure they have access to quality education. The scheme covers students studying in both government and private schools, from primary to higher secondary levels. Under this scheme, eligible students can receive scholarships to cover their tuition fees, textbooks, and other educational expenses. The scheme also offers mentorship programs and career counseling to help students make informed choices about their future. The objective of this scheme is to reduce the financial burden on families and promote equal educational opportunities for all.",
      benefits: [
        "Full or partial tuition fee coverage for eligible students",
        "Free textbooks and educational materials",
        "Mentorship programs and career counseling",
        "Access to educational resources and learning tools",
        "Financial assistance for extracurricular activities and educational trips",
      ],
      eligibility: [
        "Students from economically disadvantaged backgrounds",
        "Enrolled in a recognized government or private school",
        "Good academic performance",
        "Fulfillment of income criteria set by the scheme",
      ],
      applicationProcess: [
        "Obtain the application form from the designated education authority or school",
        "Complete the application form with accurate information",
        "Attach the required documents, including income proof, academic records, and identity proof",
        "Submit the application form to the designated authority or school",
        "Applications will be reviewed, and eligible students will be notified of their acceptance",
      ],
      requiredDocuments: [
        "Proof of income (salary slips, income certificate, etc.)",
        "Academic records or report cards",
        "Identity proof (Aadhaar card, birth certificate, etc.)",
        "Residence proof",
        "Passport-sized photographs",
      ],
    },
    {
      organization: "Ministry of Information and Technology",
      scheme: "Empowering Individuals with Digital Skills",
      description:
        "The Digital Literacy Initiative aims to bridge the digital divide by providing individuals with the necessary skills to navigate and utilize digital...",
      categories: [
        "Digital Literacy",
        "Skills Development",
        "Technology",
        "Internet",
        "Empowerment",
        "Education",
      ],
      details:
        "The Digital Literacy Initiative aims to bridge the digital divide by providing individuals with the necessary skills to navigate and utilize digital technologies effectively. The scheme focuses on enhancing digital literacy and promoting the use of digital platforms for education, communication, and accessing government services. Under this initiative, individuals can participate in training programs that cover basic computer skills, internet usage, online safety, and digital applications. The scheme also facilitates the provision of affordable devices and internet connectivity to enable access to digital resources. By empowering individuals with digital literacy, the initiative aims to create a digitally inclusive society and enhance educational and economic opportunities for all.",
      benefits: [
        "Digital skills training programs",
        "Access to affordable devices and internet connectivity",
        "Knowledge on internet usage and online safety",
        "Enhanced employment and educational opportunities",
        "Access to government services and information",
      ],
      eligibility: [
        "Residents of the country",
        "No specific age restrictions",
        "Open to individuals from all socio-economic backgrounds",
      ],
      applicationProcess: [
        "Visit the designated digital literacy center or training institute",
        "Enroll in the digital skills training program",
        "Attend the scheduled training sessions",
        "Participate in hands-on activities and practical exercises",
        "Complete the assigned coursework and assessments",
        "Receive a digital literacy certification upon successful completion",
        "Access additional resources and support for continued skill development",
      ],
      requiredDocuments: [
        "Identification proof (Aadhaar card, passport, etc.)",
        "Proof of residence",
        "Any additional documents as required by the training institute",
      ],
    },
  ]);

  const navigation = useNavigation();

  const handleSchemePress = (scheme) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    navigation.navigate("Details", { scheme });
  };

  const [data,setData]=useState(null);
  async function retrieveUserToken() {
    try {
      const user = await AsyncStorage.getItem('codivasUser');
      if (user !== null) {
        setData(JSON.parse(user));
      }
    } catch (error) {
      console.log('Error retrieving user token:', error);
    }
  }

  useEffect(() => {
    retrieveUserToken();
  }, []);

  const renderGovernmentSchemes = () => {
    return governmentSchemes.map((scheme, index) => (
      <TouchableOpacity
        style={styles.card}
        key={index}
        onPress={() => handleSchemePress(scheme)}
      >
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{scheme.organization}</Text>
        </View>
        <Text style={styles.schemeName}>{scheme.scheme}</Text>
        <Text style={styles.schemeDescription}>{scheme.description}</Text>
        <View style={styles.categoryTagsContainer}>
          {scheme.categories.map((category, index) => (
            <View style={styles.categoryTag} key={index}>
              <Text style={styles.categoryTagText}>{category}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    ));
  };

  return (

    <>
      {
        data?<ScrollView>
        <View style={styles.container}>
        <View style={styles.header}>
          <TextInput style={styles.searchInput} placeholder="Search..." />
          <View style={styles.profileIconContainer}>
              <TouchableOpacity style={styles.profileIcon}>
                <Text style={styles.profileImage}>{data.name.charAt(0)}</Text>
              </TouchableOpacity>
            </View>
        </View>
          <View style={styles.schemesContainer}>{renderGovernmentSchemes()}</View>
        </View>
      </ScrollView>:""
      }
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0.02 * screenWidth,
    paddingHorizontal: 0.05 * screenWidth,
    marginTop:50,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 0.03 * screenWidth,
  },
  profileIconContainer: {
    marginLeft: 0.04 * screenWidth,
    overflow: "hidden",
  },
  profileIcon: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    borderRadius: 0.065 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    //textAlign: "center",
    fontSize: 30,
    padding: 5,
    overflow:"hidden",
  },
  profileImage: {
    width: 0.13 * screenWidth,
    height: 0.13 * screenWidth,
    backgroundColor: "#0E1D61",
    color: "white",
    fontSize: 30,
    padding: 5,
    marginLeft:Platform.OS === "android" ? 0.015 * screenWidth : 0.017 * screenWidth,
    marginTop:Platform.OS === "android" ? -5: -2,
  },
  title: {
    fontSize: 0.06 * screenWidth,
    fontWeight: "bold",
    marginTop: 0.04 * screenWidth,
  },
  searchBar: {
    marginTop: 0.04 * screenWidth,
    padding: 0.02 * screenWidth,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 0.02 * screenWidth,
  },
  schemesContainer: {
    marginTop: 0.04 * screenWidth,
    padding: 0.04 * screenWidth,
  },
  card: {
    padding: 0.03 * screenWidth,
    marginBottom: 0.02 * screenWidth,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0.02 * screenWidth,
  },
  category: {
    fontSize: 14,
    fontWeight: "normal",
    color:'gray'
  },
  schemeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0.02 * screenWidth,
  },
  schemeDescription: {
    fontSize: 14,
    marginBottom: 0.02 * screenWidth,
    color:'grey'
  },
  categoryTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryTag: {
    backgroundColor: "#ECECEC",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  categoryTagText: {
    fontSize: 12,
  },
});

export default GovernmentScheme;
