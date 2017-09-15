   myApp.controller('TermsAndConditionCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
       $scope.template = TemplateService.getHTML("content/terms-condition.html");
       TemplateService.title = ""; //This is the Title of the Website
       TemplateService.class = "terms-condition"; //This is the Class of the Theme
       TemplateService.templateTitle = ""; //This is the Title of the Theme
       $scope.navigation = NavigationService.getNavigation();

       $scope.TandC = [{
               q: "Agreement between User and Frontida, Inc.",
               a: "Welcome to Frontida, Inc. The Frontida, Inc. website (the “Site”) is comprised of various web pagesoperated by Frontida, Inc.(“Frontida”). Frontida, Inc. is offered to you conditioned on your acceptancewithout modification of the terms, conditions, and notices contained herein (the “Terms”). Your use ofFrontida, Inc. constitutes your agreement to all such Terms. Please read these terms carefully, and keep acopy of them for your reference.Frontida, Inc. is a Company, Services and Products Site. The product “iSee” is the registered and proprietary product of Frontida, Inc. Frontida, Inc. owns the Intellectual Property rights to iSEE.Services and Product Information"
           },
           {
               q: "Electronic Communications",
               a: "Visiting Frontida, Inc. or sending emails to Frontida constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the site, satisfy any legal requirement that such communications be in writing."

           },
           {
               q: "Children Under Thirteen",
               a: "Frontida does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use Frontida, Inc. only with permission of a parent or guardian."

           },
           {
               q: "Links to Third Party Sites/Third Party Services",
               a: "Frontida, Inc. may contain links to other websites (“Linked Sites”). The linked sites other than “iSee” are not under the control of Frontida and Frontida is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Frontida is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Frontida of the site or any association with its operators. Certain services made available via Frontida, Inc. are delivered by third party sites and organizations. By using any product, service or functionality originating from the Frontida, Inc. domain, you hereby acknowledge and consent that Frontida may share such information and data with any third party with whom Frontida has a contractual relationship to provide the requested product, service or functionality on behalf of Frontida, Inc. users and customers."

           },
           {
               q: "No Unlawful or Prohibited Use/Intellectual Property",
               a: "You are granted a non-exclusive, non-transferable, revocable license to access and use Frontida, Inc. strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to Frontida that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party’s use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site. All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of Frontida, iSee or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto. Page 2 of 4 You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part found on the Site. Frontida content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of Frontida and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of Frontida, iSee or our licensors except as expressly authorized by these Terms."

           },
           {
               q: "International Users",
               a: "The Service is controlled, operated and administered by Frontida from our offices within the United States of America (USA). If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the Frontida or iSee Content accessed through Frontida, Inc. in any country or in any manner prohibited by any applicable laws, restrictions or regulations."

           },
           {
               q: "Indemnification",
               a: "You agree to indemnify, defend and hold harmless Frontida, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (Including reasonable attorney’s fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. Frontida reserves the right, at its own, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with Frontida in asserting any available defences."

           },
           {
               q: "Arbitration",
               a: "In the event the parties are not able to resolve any dispute between then arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then dispute shall be resolved only by final and binding arbitration to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator’s award shall be final, and judgement may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney’s fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms &amp; Conditions, Whether directly or indirectly, including Tort claims that are a result of these Terms &amp; Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions."

           },
           {
               q: "Class Action Waiver",
               a: "Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN BACH’S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/OR REPRESENTATIVE PROCEEDING SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and Frontida agree otherwise, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding."

           },
           {
               q: "Liability Disclaimer",
               a: "THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. FRONTIDA, iSEE AND/OR ITS SUPPLIERS /VENDORS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME. FRONTIDA, iSEE AND/OR ITS SUPPLIERS/VENDORS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED “AS IS” WITHOUT WARRANTY OR CONDITION OF ANY KIND. FRONTIDA , iSEE AND/OR ITS SUPPLIERS /VENDORS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FRONTIDA, iSEE AND OR ITS SUPPLIERS/VENDORS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE. DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION , SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE,OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTERWISE, EVEN IF FRONTIDA, iSEE OR ANY OF ITS SUPPLIERS /VENDORS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE."

           },
           {
               q: "Termination/Action Restriction",
               a: "Frontida and iSEE reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the Maximum extent permitted by law, this agreement is governed by the laws of the State of Georgia and you hereby consent to the exclusive jurisdiction and venue of courts in Georgia in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section. You agree that no joint venture, partnership, employment, or agency relationship exists between you and Frontida as a result of this agreement or use of the Site. Frontida’s performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of Frontida’s right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by Frontida with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to; the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect. Page 4 of 4 Unless otherwise/specified herein, this agreement constitutes the entire agreement between the user and Frontida with respect to the Site and it’s supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and Frontida with respect to the Site. A Printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English."

           },
           {
               q: "Changes to Terms",
               a: "Frontida and iSEE reserves the right, in its sole discretion, to change the Terms under which Frontida, Inc. is offered. The most current version of the Terms will supersede all previous versions. Frontida and iSEE encourages you to periodically review the Terms to stay informed of our updates."

           },
           {
               q: "Contact Us",
               a: "Frontida and iSEE Welcomes your questions or comments regarding the terms:"

           }
       ];
   })