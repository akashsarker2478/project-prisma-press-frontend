"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ChevronDown, Moon, Sun } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getMe } from "@/service/getMe"
import { logoutAction } from "@/service/_actions/logoutActions"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
]

export function Navbar() {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user,setUser] = useState <UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   requestAnimationFrame(() => {
    setMounted(true)
  })
  //user data
async function fetchUserData() {
      try {
        const res = await getMe()
        // console.log(res);
        if (res.success && res.data.profile) {
          setUser(res.data.profile)
        } else {
          setUser(null)
        }
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            D.
          </span>
          <span>Dev Press</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
          >
            {mounted && isDark ? <Sun data-icon="inline-start" /> : <Moon data-icon="inline-start" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="size-8">
                  <AvatarImage src="/avatars/user.jpg" alt="Alex Morgan" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">Alex Morgan</span>
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
        <div className="flex items-center gap-2">
  {/* Theme Toggle Button */}
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(isDark ? "light" : "dark")}
  >
    {mounted && isDark ? <Sun /> : <Moon />}
  </Button>

  {/* 1. Jodi loading hoy, tahole ekta choto skeleton ba loader dekhabe */}
  {loading ? (
    <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
  ) : user ? (
    /* 2. Jodi user login kora thake, tahole Avatar ar Dropdown dekhabe */
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2">
          <Avatar className="size-8">
            <AvatarImage src={user.avatar || "/avatars/user.jpg"} alt={user.name || "User"} />
            <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">{user.name || "Account"}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async() => {
            // Logout handler (cookie clear ba redirect)
            setUser(null)
            await logoutAction()
            router.refresh()
          }}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    /* 3. Jodi user login na kora thake, tahole Login & Register button dekhabe */
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  )}
</div>
      </nav>
    </header>
  )
}