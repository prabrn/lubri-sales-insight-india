
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BellRing, Bell, Mail, MessagesSquare, BadgePercent, Shield } from "lucide-react";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="System Settings" 
          subtitle="Configure your loyalty program system preferences"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <Tabs defaultValue="general">
              <TabsList className="mb-6 w-full sm:w-auto">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="points">Points & Rewards</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              {/* General Settings Tab */}
              <TabsContent value="general">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Information</CardTitle>
                      <CardDescription>Manage your loyalty program details and branding</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="programName">Program Name</Label>
                          <Input id="programName" value="Premium Lubricant Rewards" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="programSlogan">Program Slogan</Label>
                          <Input id="programSlogan" value="Earn rewards with every purchase" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="programDescription">Program Description</Label>
                        <Input id="programDescription" value="Our premier loyalty program rewards customers for purchasing lubricant products and services." />
                      </div>

                      <Separator />
                      
                      <div className="space-y-3">
                        <Label>Program Options</Label>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow Point Expiry</p>
                            <p className="text-sm text-muted-foreground">Points will expire after the set time period</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Member Referral Bonuses</p>
                            <p className="text-sm text-muted-foreground">Reward members for referring new customers</p>
                          </div>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Auto Tier Upgrades</p>
                            <p className="text-sm text-muted-foreground">Automatically upgrade members when they reach tier thresholds</p>
                          </div>
                          <Switch checked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Integration Settings</CardTitle>
                      <CardDescription>Configure external system integrations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">E-commerce Integration</p>
                          <p className="text-sm text-muted-foreground">Connect with your online store platform</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">CRM Integration</p>
                          <p className="text-sm text-muted-foreground">Sync customer data with your CRM system</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">POS System Integration</p>
                          <p className="text-sm text-muted-foreground">Connect with your point-of-sale system</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when notifications are sent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-3">
                          <Mail className="h-5 w-5" /> 
                          Email Notifications
                        </h3>
                        <div className="space-y-3 ml-7">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="emailWelcome">Welcome Message</Label>
                            <Switch id="emailWelcome" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="emailPointsEarned">Points Earned</Label>
                            <Switch id="emailPointsEarned" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="emailRedemption">Reward Redemption</Label>
                            <Switch id="emailRedemption" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="emailTierChange">Tier Change</Label>
                            <Switch id="emailTierChange" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="emailPromotions">Promotions</Label>
                            <Switch id="emailPromotions" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-3">
                          <BellRing className="h-5 w-5" /> 
                          Push Notifications
                        </h3>
                        <div className="space-y-3 ml-7">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="pushPointsEarned">Points Earned</Label>
                            <Switch id="pushPointsEarned" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="pushRedemption">Reward Redemption</Label>
                            <Switch id="pushRedemption" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="pushTierChange">Tier Change</Label>
                            <Switch id="pushTierChange" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="pushExpiration">Point Expiration</Label>
                            <Switch id="pushExpiration" checked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-3">
                          <MessagesSquare className="h-5 w-5" /> 
                          SMS Notifications
                        </h3>
                        <div className="space-y-3 ml-7">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="smsWelcome">Welcome Message</Label>
                            <Switch id="smsWelcome" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="smsSignificant">Significant Rewards</Label>
                            <Switch id="smsSignificant" checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="smsPromotions">Special Promotions</Label>
                            <Switch id="smsPromotions" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Points & Rewards Tab */}
              <TabsContent value="points">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BadgePercent className="h-5 w-5" /> 
                        Point System Configuration
                      </CardTitle>
                      <CardDescription>Configure how points are earned and valued</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="pointsPerDollar">Points per Dollar</Label>
                          <Input id="pointsPerDollar" type="number" value="10" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pointValue">Point Value (cents)</Label>
                          <Input id="pointValue" type="number" value="2" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minimumPoints">Minimum Points for Redemption</Label>
                          <Input id="minimumPoints" type="number" value="500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryDays">Point Expiry (days)</Label>
                          <Input id="expiryDays" type="number" value="365" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Earning Multipliers</h3>
                        <div className="space-y-3">
                          <div className="grid gap-4 sm:grid-cols-2 items-center">
                            <Label htmlFor="bronzeMultiplier">Bronze Tier Multiplier</Label>
                            <Input id="bronzeMultiplier" type="number" value="1.0" />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 items-center">
                            <Label htmlFor="silverMultiplier">Silver Tier Multiplier</Label>
                            <Input id="silverMultiplier" type="number" value="1.25" />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 items-center">
                            <Label htmlFor="goldMultiplier">Gold Tier Multiplier</Label>
                            <Input id="goldMultiplier" type="number" value="1.5" />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 items-center">
                            <Label htmlFor="platinumMultiplier">Platinum Tier Multiplier</Label>
                            <Input id="platinumMultiplier" type="number" value="2.0" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Reward Settings</CardTitle>
                      <CardDescription>Configure reward options and availability</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow Partial Redemptions</p>
                            <p className="text-sm text-muted-foreground">Members can redeem partial values of rewards</p>
                          </div>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow Gift Rewards</p>
                            <p className="text-sm text-muted-foreground">Members can send rewards to other members</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Tier-Exclusive Rewards</p>
                            <p className="text-sm text-muted-foreground">Some rewards are only available to specific tiers</p>
                          </div>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Limited Quantity Rewards</p>
                            <p className="text-sm text-muted-foreground">Some rewards have limited availability</p>
                          </div>
                          <Switch checked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" /> 
                      Security Settings
                    </CardTitle>
                    <CardDescription>Configure security and privacy options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Require 2FA for admin users</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">IP Restriction</p>
                          <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-3">Privacy Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Retention Policy</p>
                            <p className="text-sm text-muted-foreground">Automatically delete inactive member data after 2 years</p>
                          </div>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Allow Data Export</p>
                            <p className="text-sm text-muted-foreground">Let members export their loyalty program data</p>
                          </div>
                          <Switch checked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Anonymization</p>
                            <p className="text-sm text-muted-foreground">Anonymize data for reporting purposes</p>
                          </div>
                          <Switch checked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Admin Access Control</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                          <Input id="passwordExpiry" type="number" value="90" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loginAttempts">Failed Login Attempts</Label>
                          <Input id="loginAttempts" type="number" value="5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Security Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
